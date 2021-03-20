import Spinner from 'react-loader-spinner'

export default function () {
    return (
        <div>
            <Spinner
                type="ThreeDots"
                color="#ff3b0f"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        </div>
    )
}
