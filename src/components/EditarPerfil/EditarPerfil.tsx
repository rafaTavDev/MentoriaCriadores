import { useState, useRef, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ErroContext } from "../../Contexts/ModalErroContext";
import AvatarEditor from "react-avatar-editor";
import { UsuarioType } from "../../Contexts/ModalErroContext";
import imgOlho from "../../assets/imgs/olhoSenha.svg"
import xisBranco from "../../assets/imgs/xisBranco.svg"


export default function EditarPerfil(){
  

  const {usuario, setUsuario, setTemErro, setUsuarios, wantEdit, setWantEdit, primeiraVez, setPrimeiraVez} = useContext(ErroContext)

  useEffect(() => {
    fetch("http://localhost:3000/Usuario", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json()).then(data => {
      setUsuario(data[0])
    }).catch(() => setTemErro(true))
  }, [wantEdit])


  const [nomeEdit, setNomeEdit] = useState<string>(usuario.nome)
  const [sobrenomeEdit, setSobrenomeEdit] = useState<string>(usuario.sobrenome)
  const [telefoneEdit, setTelefoneEdit] = useState<string>(usuario.telefone)
  const [idadeEdit, setIdadeEdit] = useState<number>(usuario.idade)
  const [descricaoEdit, setDescricaoEdit] = useState<string>(usuario.descricao)
  const [instagramEdit, setInstagramEdit] = useState<string>(usuario.instagram)
  const [profissaoEdit, setProfissaoEdit] = useState<string>(usuario.profissao)
  const [senhaAntiga, setSenhaAntiga] = useState<string>("")
  const [senhaNova1, setSenhaNova1] = useState<string>("")
  const [senhaNova2, setSenhaNova2] = useState<string>("")
  const [respSenha, setRespSenha] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)


    var editor: any = "";
    const [picture, setPicture] = useState<any>({
      cropperOpen: false,
      img: null,
      zoom: 1.5,
      croppedImg:
        "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png"
    });
  
    const handleSlider = (event: any, value: any) => {
      setPicture({
        ...picture,
        zoom: value
      });
    };
  
    const handleCancel = () => {
      setPicture({
        ...picture,
        cropperOpen: false
      });
    };
  
    const setEditorRef = (ed: any) => {
      editor = ed;
    };
  
    const handleSave = (e: any) => {
        const canvasScaled = editor.getImageScaledToCanvas();
        const croppedImg = canvasScaled.toDataURL();
  
        setPicture({
          ...picture,
          img: null,
          cropperOpen: false,
          croppedImg: croppedImg
        });
    };
  
    const handleFileChange = (e: any) => {
      let url = URL.createObjectURL(e.target.files[0]);
      console.log(url);
      setPicture({
        ...picture,
        img: url,
        cropperOpen: true
      });
    };


    const salvarAlteracoes = () => {
      fetch("http://localhost:3000/editarUsuario", {
        method: "POST",
        headers: {"Content-Type": "application/json", "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
        body: JSON.stringify({
          nome: nomeEdit,
          sobrenome: sobrenomeEdit,
          profissao: profissaoEdit,
          instagram: instagramEdit,
          telefone: telefoneEdit,
          idade: idadeEdit,
          descricao: descricaoEdit
        })
      }).then(res => res.json()).then(data => setUsuario(data[0])).catch(() => setTemErro(true)).finally(() => {
        setPrimeiraVez(false)
        setWantEdit(false)
        fetch("http://localhost:3000/Usuarios", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json() as Promise<UsuarioType[]>).then(data => {
          data = data.filter(item => item.nome && item.sobrenome && item.descricao)
          setUsuarios(data)
       }).catch(() => setTemErro(true)).finally(() => {
          fetch("http://localhost:3000/Usuario", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json()).then(data => {
            setUsuario(data[0])
          }).catch(() => setTemErro(true))
       })
      })
    }


    const redefinirSenha = () => {
      if(!senhaAntiga || !senhaNova1 || !senhaNova2){
        setRespSenha("Preencha todos os campos de redefinição de senha, por favor")
        return 
      }
      
      if(senhaNova1 !== senhaNova2){
        setRespSenha("A senha nova foi repetida errada")
        return 
      }

      fetch("http://localhost:3000/redefinirSenha", {
        method: "POST",
        headers: {"Content-Type": "application/json", "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
        body: JSON.stringify({
          senhaAntiga,
          senhaNova: senhaNova1
        })
      }).then(res => res.json()).then(data => {
        if(data[0] == "erro"){
          setRespSenha(data[1])
        }else{
          setRespSenha("Senha redefinida com sucesso!")
        }
      }).catch(() => setTemErro(true))

    }

    return (
        <div className="bg-black/80 absolute z-50 inset-0 p-3 flex flex-col gap-10">
            {/*<div className="flex">
                <div className="flex gap-3 items-center">
                  <img
                      src={picture.croppedImg}
                      className="w-64 h-64 p-1 rounded-xl"
                  />
                  <button
                      className="w-full bg-red-700 text-white"
                  >
                      <input type="file" accept="image/*" onChange={handleFileChange}/>
                  </button>
                </div>

                {picture.cropperOpen && (
                <div className="block">
                    <AvatarEditor
                    ref={setEditorRef}
                    image={picture.img}
                    width={200}
                    height={200}
                    border={50}
                    color={[255, 255, 255, 0.6]} // RGBA
                    rotate={0}
                    scale={picture.zoom}
                    />
                    <input type="range"
                    aria-label="raceSlider"
                    value={picture.zoom}
                    min={1}
                    max={10}
                    step={0.1}
                    onChange={(e) => handleSlider(e, e.target.value)}
                    />
                    <div>
                        <button  onClick={handleCancel}>
                            Cancel
                        </button>
                        <button onClick={handleSave}>Save</button>
                    </div>
                </div>
                )}
                </div>*/}

            {
              primeiraVez &&
              <div className="self-center text-2xl text-white text-center">
                Como é o seu primeiro login, nos dê rapidamente informações sobre você, por favor!
              </div>
            }

            <div className="flex items-center justify-between">
              <div className="text-thalesRed text-2xl">
                Redefinir senha
              </div>
              <img src={xisBranco} alt="xis para fechar o modal" className="h-8 w-auto cursor-pointer" onClick={() => setWantEdit(false)}/>
            </div>
            <div className="rounded-md flex bg-white w-1/3">
              <input type={showPassword ? "text" : "password"} className="p-2 flex-1 outline-none rounded-md" placeholder="Senha atual" value={senhaAntiga} onChange={e => setSenhaAntiga(e.target.value)}/>
              <img onClick={() => setShowPassword(!showPassword)} src={imgOlho} alt="imagem-para-ver-senha" className="h-10 w-auto p-1 cursor-pointer"/>
            </div>
            <div className="rounded-md flex bg-white w-1/3">
              <input type={showPassword ? "text" : "password"} className="p-2 flex-1 outline-none rounded-md" placeholder="Nova senha" value={senhaNova1} onChange={e => setSenhaNova1(e.target.value)}/>
              <img onClick={() => setShowPassword(!showPassword)} src={imgOlho} alt="imagem-para-ver-senha" className="h-10 w-auto p-1 cursor-pointer"/>
            </div>
            <div className="rounded-md flex bg-white w-1/3">
              <input type={showPassword ? "text" : "password"} className="p-2 flex-1 outline-none rounded-md" placeholder="Repetir nova senha" value={senhaNova2} onChange={e => setSenhaNova2(e.target.value)}/>
              <img onClick={() => setShowPassword(!showPassword)} src={imgOlho} alt="imagem-para-ver-senha" className="h-10 w-auto p-1 cursor-pointer"/>
            </div>
            <div className="flex gap-3 items-center">
              <button className="p-2 rounded-md bg-zinc-900 text-white border-black border-2" onClick={redefinirSenha}>Redefinir Senha</button>
              {
                respSenha && 
                <div className="text-white">{respSenha}</div>
              }             
            </div>

            <div className="text-thalesRed text-2xl">
              Redefinir dados pessoais
            </div>
            
            <div className="flex items-center gap-3">
              <input type="text" className="w-1/3 outline-none border-none rounded-md p-2" placeholder="Nome" value={nomeEdit} onChange={e => setNomeEdit(e.target.value)}/>
            </div>

            <div className="flex items-center gap-3">
              <input type="text" className="w-1/3 outline-none border-none rounded-md p-2" placeholder="Sobrenome" value={sobrenomeEdit} onChange={e => setSobrenomeEdit(e.target.value)}/>
            </div>

            <div className="flex items-center gap-3">
              <input type="text" className="w-1/3 outline-none border-none rounded-md p-2" placeholder="Profissão" value={profissaoEdit} onChange={e => setProfissaoEdit(e.target.value)}/>
            </div>

            <div className="flex items-center gap-3">
              <input type="number" className="w-1/3 outline-none border-none rounded-md p-2" placeholder="whatsapp ex: 21999999999" value={telefoneEdit} onChange={e => setTelefoneEdit(e.target.value)}/>
            </div>

            <div className="flex items-center gap-3">
              <input type="text" className="w-1/3 outline-none border-none rounded-md p-2" placeholder="Digite seu @" value={instagramEdit} onChange={e => setInstagramEdit(e.target.value)}/>
            </div>

            <div className="flex items-center gap-3">
              <input type="number" className="w-1/3 outline-none border-none rounded-md p-2" placeholder="Idade" value={idadeEdit} onChange={e => setIdadeEdit(Number(e.target.value))}/>
            </div>

            <div className="flex items-center gap-3">
              <textarea className="outline-none border-none rounded-md p-2 resize-none w-1/2 h-36" placeholder="Descrição" value={descricaoEdit} onChange={e => setDescricaoEdit(e.target.value)}/>
            </div>

            <div className="flex justify-center gap-3 pb-3">
              <button className="p-2 rounded-md bg-zinc-900 text-white border-black border-2" onClick={salvarAlteracoes}>Salvar alterações de dados</button>
              <button onClick={() => {setWantEdit(false); setPrimeiraVez(false)}} className=" bg-red-600 text-white border-black border-2 rounded-md p-2">
                Voltar
              </button>
            </div>
          </div>
    )
}