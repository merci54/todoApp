import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './TaskForm.module.css';
import { postTask } from '../../services/taskService';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface TaskFormProps {
  onClose: () => void;
}

interface formValues {
  text: string;
}

const initialValues: formValues = {
  text: '',
};

const textSchema = Yup.object().shape({
  text: Yup.string()
    .min(2, 'Too short!')
    .max(20, 'Too long')
    .required('Required!'),
});

export default function TaskForm({ onClose }: TaskFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleSubmit = (values: formValues) => {
    mutate({ title: values.text });
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={textSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Task text
          <Field
            as="textarea"
            name="text"
            className={css.input}
            rows={5}
          ></Field>
        </label>
        <ErrorMessage name="text" component="span" className={css.error} />

        <button type="submit" className={css.button}>
          {isPending ? 'Creating...' : 'Create'}
        </button>
      </Form>
    </Formik>
  );
}
