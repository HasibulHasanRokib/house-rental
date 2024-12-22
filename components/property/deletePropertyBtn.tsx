"use client";
import { deletePropertyAction } from "@/actions/property/deletePropertyAction";
import { useToast } from "@/hooks/use-toast";
import { Property } from "@prisma/client";

export function DeletePropertyBtn({ property }: { property: Property }) {
  const { toast } = useToast();

  const handleDelete = async (property: Property) => {
    const response = await deletePropertyAction(property);
    if (response.error) {
      alert(response.error);
    } else {
      toast({
        variant: "default",
        title: response.success,
        description: "There was a problem with your request.",
      });
    }
  };
  return <button onClick={() => handleDelete(property)}>Delete</button>;
}
