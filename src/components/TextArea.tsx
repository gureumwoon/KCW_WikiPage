import { ChangeEvent } from "react";

type TextAreaProps = {
    textAreacontent?: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ textAreacontent, onChange }: TextAreaProps) {
    return (
        <textarea
            className="w-full h-3/5 rounded-lg border-2 border-zinc-300 my-10 outline-none p-5 text-lg"
            name="content"
            placeholder="Content"
            value={textAreacontent}
            onChange={onChange}
        />
    )
}
