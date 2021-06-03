import {
  Container,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import TextEditor from "../../components/TextEditor";
import { addDraft } from "../../redux/actions/news";

function CreateDraft() {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [isReadyForReview, setIsReadyForReview] = React.useState(false);

  function sendDraft() {
    dispatch(addDraft(title, "картинка", text, isReadyForReview));
  }

  return (
    <Container>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Заголовок"
        fullWidth
      />
      <h2>Текст:</h2>
      <TextEditor setText={setText} />
      <FormControlLabel
        control={
          <Checkbox
            checked={isReadyForReview}
            onChange={() => setIsReadyForReview(!isReadyForReview)}
          />
        }
        label="Отправить на ревью"
      />
      <Button variant="contained" color="primary" onClick={() => sendDraft()}>
        Сохранить
      </Button>
    </Container>
  );
}

export default CreateDraft;
