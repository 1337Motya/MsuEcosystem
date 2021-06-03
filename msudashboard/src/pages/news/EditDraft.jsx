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
import { fetchDraft, updateDraft } from "../../redux/actions/news";
import CircularProgress from "@material-ui/core/CircularProgress";

function EditDraft() {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState(null);
  const [isReadyForReview, setIsReadyForReview] = React.useState(false);
  const isLoaded = useSelector(({ news }) => news.isLoaded);
  const draft = useSelector(({ news }) => news.currentDraft);
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(fetchDraft(id));
  }, []);

  React.useEffect(() => {
    setTitle(draft.title);
    setText(draft.text);
    console.log(draft.isReadyForReview);
    setIsReadyForReview(draft.isReadyForReview);
  }, [isLoaded]);

  function saveChanges() {
    dispatch(
      updateDraft({
        id: draft.id,
        previewImageUrl: previewImage ?? draft.previewImageUrl,
        authorId: draft.authorId,
        title: title,
        text: text,
        isReadyForReview: isReadyForReview,
        isReviewed: draft.isReviewed,
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
          <FormControlLabel
            control={
              <Checkbox
                checked={isReadyForReview}
                onChange={() => setIsReadyForReview(!isReadyForReview)}
              />
            }
            label="Отправить на ревью"
          />
          <Button variant="contained" color="primary" onClick={() => saveChanges()}>
            Сохранить
          </Button>
        </div>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}

export default EditDraft;
