import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";

export type UsuarioType = {
    email?: string,
    nome: string, 
    sobrenome: string,
    telefone: string,
    descricao: string,
    idUser?: number,
    profissao: string,
    instagram: string,
    idade: number
}

type ErroContextTypes = {
    temErro: boolean,
    setTemErro: Dispatch<SetStateAction<boolean>>,
    carregando: boolean,
    setCarregando: Dispatch<SetStateAction<boolean>>,
    logged: boolean,
    setLogged: Dispatch<SetStateAction<boolean>>,
    usuario: UsuarioType,
    setUsuario: Dispatch<SetStateAction<UsuarioType>>,
    usuarios: UsuarioType[],
    setUsuarios: Dispatch<SetStateAction<UsuarioType[]>>,
    wantEdit: boolean,
    setWantEdit: Dispatch<SetStateAction<boolean>>,
    primeiraVez: boolean,
    setPrimeiraVez: Dispatch<SetStateAction<boolean>>,
    tamTela: number,
    setTamTela:Dispatch<SetStateAction<number>>
}

export const ErroContext = createContext<ErroContextTypes>({temErro: false, setTemErro: () => {}, carregando: false, setCarregando: () => {}, logged: false, setLogged: () => {}, usuario: {} as UsuarioType, setUsuario: () => {},  usuarios: [] as UsuarioType[], setUsuarios: () => {}, wantEdit: false, setWantEdit: () => {}, primeiraVez: false, setPrimeiraVez: () => {}, tamTela: 0, setTamTela: () => {}} as ErroContextTypes)


export const ErroProvider = ({children}: {children: React.ReactNode}) => {
    const [temErro, setTemErro] = useState<boolean>(false)
    const  [carregando, setCarregando] = useState<boolean>(false)
    const [logged, setLogged] = useState<boolean>(false)
    const [usuario, setUsuario] = useState<UsuarioType>({} as UsuarioType)
    const [usuarios, setUsuarios] = useState<UsuarioType[]>([] as UsuarioType[])
    const [wantEdit, setWantEdit] = useState<boolean>(false)
    const [primeiraVez, setPrimeiraVez] = useState<boolean>(false)
    const [tamTela, setTamTela] = useState<number>(0)

    return (
        <ErroContext.Provider value={{
            temErro,
            setTemErro,
            carregando,
            setCarregando,
            logged,
            setLogged,
            usuario,
            setUsuario,
            usuarios,
            setUsuarios,
            wantEdit,
            setWantEdit,
            primeiraVez,
            setPrimeiraVez,
            tamTela,
            setTamTela
        }}>
            {children}
        </ErroContext.Provider>
    )
}