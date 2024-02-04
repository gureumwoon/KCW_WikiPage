import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Wiki } from "../context/WikiContext";
import TextArea from "../components/TextArea";
import Header from "../components/Header";

export default function PostDetailPage() {
    const [post, setPost] = useState<Wiki | null>(null);
    const [isModify, setIsModify] = useState(false);
    const [content, setContent] = useState(post?.content);
    const { id } = useParams();
    const navigate = useNavigate();

    const localPost = localStorage.getItem('wikiData')
    const objectLocalPost = useMemo(() => localPost ? JSON.parse(localPost) : [], [localPost]);;
    const titles = objectLocalPost.map((post: Wiki) => post.title)
    console.log(titles)

    useEffect(() => {
        const postOne = objectLocalPost.find((post: Wiki) => post.id === Number(id));
        setPost(postOne)
    }, [id, objectLocalPost])

    const addLink = (content: string) => {
        let linkedContent = content;
        for (const title of titles) {
            const foundObject = objectLocalPost.find((post: Wiki) => post.title === title);
            if (content.includes(title)) {
                return linkedContent = linkedContent.replace(title, `<a href="/post/${foundObject.id}">${title}</a>`);
            }
        }
        return content;
    }

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsModify(false);

        const updatedWikiList = objectLocalPost.map((wiki: Wiki) => {
            if (wiki.id === Number(id)) {
                return { ...wiki, content: content };
            }
            return wiki;
        });
        localStorage.setItem('wikiData', JSON.stringify(updatedWikiList));
    }

    return (
        <div className="flex flex-col items-center h-full">
            <Header />
            <div className="w-full h-full flex flex-col justify-center items-center max-w-screen-xl px-28">
                <h1 className="w-full p-5 rounded-lg border-2 border-zinc-300 outline-none text-2xl">{post?.title}</h1>
                {
                    isModify ?
                        <TextArea textAreacontent={post?.content} onChange={handleContentChange} />
                        :
                        <div className="w-full h-3/5 rounded-lg border-2 border-zinc-300 my-10 outline-none p-5 text-lg text-left" >
                            <p dangerouslySetInnerHTML={{ __html: addLink(post?.content ?? "") }}></p>
                        </div>
                }

                <div className="flex">
                    {
                        !isModify ?
                            <button className="w-28 mr-3 h-12 rounded-md bg-mainColor items-center text-md font-medium text-white" onClick={() => setIsModify(true)}>수정하기</button> :
                            <button className="w-28 mr-3 h-12 rounded-md bg-mainColor items-center text-md font-medium text-white" onClick={handleUpdate}>등록하기</button>
                    }
                    <button className="w-28 h-12 rounded-md bg-subColor text-mainColor items-center text-md font-medium" onClick={() => navigate('/')}>돌아가기</button>
                </div>
            </div>
        </div >
    )
}
