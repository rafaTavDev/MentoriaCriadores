
export default function Perfil(){
    return(
        <div className="w-[17vw] h-[17vw] bg-emerald-600 rounded-xl overflow-hidden relative group">
            <img src={""} alt="imagem de perfil" className="w-full h-full object-cover"/>
            <div className="absolute bg-black/80 group-hover:inset-0 text-white flex flex-col items-center justify-center gap-4 p-3">
                <div className="text-2xl font-bold">Rafael Tavares</div>
                <a href="">
                    <div className="rounded-md p-2 bg-green-500 text-white">
                        chamar no whatsapp
                    </div>
                </a>
                <div className="text-center overflow-y-auto scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-slate-600">
                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos nemo reiciendis, blanditiis quasi pariatur incidunt fugit iusto deleniti? Consectetur omnis sapiente similique laudantium maiores, aut officia atque officiis et quasi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit neque aperiam debitis sapiente, vitae perferendis! Voluptate quod minima dolor optio, laudantium consequatur asperiores nam quas velit. Sit necessitatibus inventore asperiores.</div>
            </div>
        </div>
    )
}