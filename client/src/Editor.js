import ReactQuill from "react-quill";

const modules = {
    toolbar: [
         [{ header: [1, 2, false] }]
    ]
};

export default function Editor({ value, onChange }) {
    return (
        <ReactQuill
            value={value}
            theme={'snow'}
            onChange={onChange}
            modules={modules}
        />
    );
}
