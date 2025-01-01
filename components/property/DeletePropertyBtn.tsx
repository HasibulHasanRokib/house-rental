"use client";
import { deletePropertyAction } from "@/actions/property/deletePropertyAction";
import { useToast } from "@/hooks/use-toast";
import { Property } from "@prisma/client";

export function DeletePropertyBtn({ property }: { property: Property }) {
  const { toast } = useToast();

  const handleDelete = async (property: Property) => {
    const response = await deletePropertyAction(property);
    if (response.error) {
      toast({
        variant: "destructive",
        title: response.error,
        description: "Please try again",
      });
    } else {
      toast({
        variant: "default",
        title: response.success,
        description: "Your property and remove  property data from our servers",
      });
    }
  };
  return <button onClick={() => handleDelete(property)}>Delete</button>;
}
