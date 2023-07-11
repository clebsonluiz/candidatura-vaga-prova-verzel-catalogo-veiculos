import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className='w-screen h-screen flex-row justify-center items-center text-center '>
            <div className="p-10">
                <h1 className='text-4xl'>Oops!</h1>
                <p>Algum erro ocorreu!.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    );
}