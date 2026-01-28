import Button from "@/components/button";
import { Inputs } from "@/components/inputs";
import { createQueue } from "@/services/queues";
import { useForm, type FieldValues } from "react-hook-form";

export default function CreateQueueModal({
  fetchQueues,
}: {
  fetchQueues: () => void;
}) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: FieldValues) => {
    createQueue(data.name)
      .then(() => {
        window.alert("Queue created successfully");
        fetchQueues();
      })
      .catch(() => {
        window.alert("Error creating queue");
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label>Queue Name</label>
      <Inputs.Text type="text" {...register("name")} />
      <Button type="submit">Create</Button>
    </form>
  );
}
