import MaxWidthWrapper from "@/components/maxWidthWrapper";
import AddPropertyForm from "@/app/(pages)/(property)/_components/addPropertyForm";

export default function AddProperty() {
  return (
    <>
      <div className="flex flex-col space-y-3 justify-center items-center py-12">
        <h3 className="text-4xl font-bold">Submit Property</h3>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>
      <MaxWidthWrapper>
        <AddPropertyForm />
      </MaxWidthWrapper>
    </>
  );
}
