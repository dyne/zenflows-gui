import Link from "next/link";

const CreationComplete = () => {
    return (
        <div>
            <h1>All set!</h1>
            <Link href={'/'}><a className={'button button-primary'}>Go to home</a></Link>
            <Link href={'/projects'}><a className={'button button-primary'}>Go to projects</a></Link>
            <Link href={'/inventory'}><a className={'button button-primary'}>Go to inventory</a></Link>
        </div>
    );
}