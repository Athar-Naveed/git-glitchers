import Link from "next/link";

const Button = ({title}:{title: string}) => {
    return (
        <>
        <Link
        href={'/ml'}
        className="border px-6 py-4 rounded-lg bg-blue-500 hover:bg-blue-700 text-white">
          {title}
        </Link>
        </>
    )
}

export default Button;