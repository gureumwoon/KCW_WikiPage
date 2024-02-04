import { useNavigate } from "react-router-dom";

type PostCardProps = {
    wiki: {
        id?: number;
        title: string;
    },
    formattedDate: string
}

export default function PostCard({ wiki, formattedDate }: PostCardProps) {
    const navigate = useNavigate();
    return (
        <li
            className="w-full h-1/5 border-b-2 border-subColor flex justify-center items-center cursor-pointer"
            onClick={() => navigate(`/post/${wiki.id}`)}
        >
            <div className="w-4/5 flex items-center justify-between">
                <p className="text-xl">{wiki.title}</p>
                <p className="text-xs">{formattedDate}</p>
            </div>
        </li>
    )
}
