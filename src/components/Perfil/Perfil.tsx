import iconeWpp from "../../assets/imgs/wppIconeBranco.svg"
import iconeInsta from "../../assets/imgs/instaIconeBranco.svg"

type Props = {
    nome: string,
    sobrenome: string,
    telefone: string,
    descricao: string,
    profissao: string,
    instagram: string
}

export default function Perfil({nome, sobrenome, telefone, descricao, profissao, instagram}: Props){

    const urlInsta = "https://www.instagram.com/" + instagram
    const urlWpp =  "https://wa.me/" + "55" + telefone + "?text=Oi!%20Vi%20seu%20perfil%20no%20site%20da%20criadores!"

    return(
        <div className="lg:w-[17vw] w-[90vw] h-1/3 lg:h-[17vw] bg-emerald-600 rounded-xl  relative group ">
            <div className="bg-black/80 w-full h-full text-white flex flex-col items-center justify-center gap-4 p-3">
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-center">{nome} {sobrenome}</div>
                    <div className="text-xl font-bold italic text-center">{profissao}</div>
                </div>
                <div className="flex lg:flex-col lg:items-center gap-4">
                    {
                        telefone &&
                        <a href={urlWpp} target="_blank">
                            <div className="rounded-md p-2 bg-green-500 text-white flex items-center gap-1">
                                <div>chamar no whatsapp</div>
                                <img className="h-4 w-auto" src={iconeWpp} alt="icone-wpp" />
                            </div>
                        </a>
                    }
                    {
                        instagram &&
                        <a href={urlInsta} target="_blank">
                            <div className="rounded-md p-2 bg-gradient-to-r from-instaYell to-instaPink text-white flex items-center gap-1">
                                <div>ver instagram</div>
                                <img className="h-4 w-auto" src={iconeInsta} alt="icone-instagram" />
                            </div>
                        </a>
                    }
                </div>
                <div className="text-center w-full overflow-y-auto scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-slate-600">
                    {descricao}
                </div>
            </div>
        </div>
    )
}