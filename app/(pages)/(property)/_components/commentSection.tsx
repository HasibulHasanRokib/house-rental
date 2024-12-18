import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function CommentSection() {
  const submit = async (formData: FormData) => {
    "use server";
    const text = formData.get("comment");
    console.log(text);
  };
  return (
    <Card>
      <CardHeader>Comment section</CardHeader>
      <CardContent>
        <div>
          <form action={submit} className="space-y-2">
            <div className="grid w-full gap-2">
              <Textarea name="comment" placeholder="Type your message here." />
              <Button type="submit">Send message</Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
