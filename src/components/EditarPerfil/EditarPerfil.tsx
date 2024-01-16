import { useState, useRef, Dispatch, SetStateAction } from "react";
import AvatarEditor from "react-avatar-editor";

type Props = {
  setWantEdit: Dispatch<SetStateAction<boolean>>
}

export default function EditarPerfil({setWantEdit}: Props){
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

    return (
        <div className="bg-black/80 absolute z-50 inset-0 p-3 flex flex-col gap-10">
            <div className="flex">
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
            </div>
            
            <div className="flex items-center gap-3">
              <input type="text" className="w-1/3 outline-none border-none rounded-md p-2" placeholder="Nome"/>
              <button className="p-2 rounded-md bg-zinc-900 text-white border-black border-2">salvar</button>
            </div>

            <div className="flex items-center gap-3">
              <input type="text" className="w-1/3 outline-none border-none rounded-md p-2" placeholder="Sobrenome"/>
              <button className="p-2 rounded-md bg-zinc-900 text-white border-black border-2">salvar</button>
            </div>

            <div className="flex items-center gap-3">
              <input type="number" className="w-1/3 outline-none border-none rounded-md p-2" placeholder="whatsapp ex: 21999999999"/>
              <button className="p-2 rounded-md bg-zinc-900 text-white border-black border-2">salvar</button>
            </div>

            <div className="flex items-center gap-3">
              <input type="number" className="w-1/3 outline-none border-none rounded-md p-2" placeholder="Idade"/>
              <button className="p-2 rounded-md bg-zinc-900 text-white border-black border-2">salvar</button>
            </div>

            <div className="flex items-center gap-3">
              <textarea className="outline-none border-none rounded-md p-2 resize-none w-1/2 h-36" placeholder="Descrição"/>
              <button className="p-2 rounded-md bg-zinc-900 text-white border-black border-2">salvar</button>
            </div>

            <div className="flex justify-center">
              <button onClick={() => setWantEdit(false)} className=" bg-red-600 text-white border-black border-2 rounded-md p-2">
                Voltar
              </button>
            </div>
          </div>
    )
}