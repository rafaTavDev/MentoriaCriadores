


export default function Menu(){
    return (
        <div className="h-20 bg-cyan-500 flex justify-between p-2">      
            <div className="h-full flex justify-center items-center">
                <img className="h-full w-auto" src="" alt="LOGO" />
            </div>
            <div className="h-full">
                <nav className="h-full flex">
                    <div className="h-full flex justify-center items-center p-2 cursor-pointer">
                        Metas
                    </div>
                    <div className="h-full flex justify-center items-center p-2 cursor-pointer">
                        Networking
                    </div>
                    <div className="h-full flex justify-center items-center p-2 cursor-pointer">   
                        Organizador
                    </div>
                </nav>
            </div>
            <div className="h-full">
                <div className="h-full flex justify-center items-center">
                    <img className="h-1/2 w-auto" src="" alt="" />
                    <div>Nome Criador</div>
                </div>
            </div>
        </div>
    )
}