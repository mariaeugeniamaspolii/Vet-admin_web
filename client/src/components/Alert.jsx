const Alert = ({ alert }) => {
    return (
        <div className={`bg-gradient-to-br text-center p-3 rounded-xl text-white font-bold ${alert.type === "error" ? 'from-red-500 to-red-600' : alert.type === "success" ? 'from-green-500 to-green-600' : 'from-yellow-500 to-yellow-600'}`}>{alert.msg}</div>

    )
}

export default Alert