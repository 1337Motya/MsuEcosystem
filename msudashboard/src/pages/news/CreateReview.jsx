import {
  Container,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../../components/TextEditor";
import { fetchDraft, addReview, updateDraft } from "../../redux/actions/news";
import CircularProgress from "@material-ui/core/CircularProgress";

function CreateReview() {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [reviewText, setReviewText] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState(null);
  const [isApproved, setIsApproved] = React.useState(false);
  const [isRequiresChanges, setIsRequiresChanges] = React.useState(false);
  const isLoaded = useSelector(({ news }) => news.isLoaded);
  const draft = useSelector(({ news }) => news.currentDraft);
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(fetchDraft(id));
  }, []);

  React.useEffect(() => {
    setTitle(draft.title);
    setText(draft.text);
  }, [isLoaded]);

  function sendReview() {
    dispatch(
      updateDraft({
        id: draft.id,
        previewImageUrl: previewImage ?? draft.previewImageUrl,
        authorId: draft.authorId,
        title: title,
        text: text,
        isReadyForReview: false,
        isReviewed: true,
        isApproved: isApproved,
        isRequiresChanges: isRequiresChanges,
      })
    );
    dispatch(
      addReview({
        isPublished: false,
        reviewText: reviewText,
        draftId: draft.id,
      })
    );
  }

  return (
    <Container>
      {isLoaded ? (
        <div>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Заголовок"
            fullWidth
          />
          <h2>Текст:</h2>
          <TextEditor text={text} setText={setText} />
          <TextField
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            label="Комментарий"
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isApproved}
                onChange={() => setIsApproved(!isApproved)}
              />
            }
            label="Готово к публикации"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isRequiresChanges}
                onChange={() => setIsRequiresChanges(!isRequiresChanges)}
              />
            }
            label="Требует изменений"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => sendReview()}
          >
            Сохранить
          </Button>
        </div>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}

export default CreateReview;
