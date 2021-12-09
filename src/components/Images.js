import React from 'react';
import { LightBox } from 'react-lightbox-pack';
import "react-lightbox-pack/dist/index.css";
const Images = ({data}) => {
    var i=0;
    var list=[];
    var ilist=[];
    const [toggle, setToggle] =  React.useState(false);
	const [sIndex, setSIndex] =  React.useState("");
    const  lightBoxHandler  = (state, sIndex) => {
		setToggle(state);
		setSIndex(sIndex);
	};
    data.map((item)=>(
        i=i+1,
        list.push({
            'id':i,
            'image':`https://image.tmdb.org/t/p/w780/${item.file_path}`
        }),
        ilist.push({
            'id':i,
            'image':`https://image.tmdb.org/t/p/w780/${item.file_path}`
        })
    ))
    console.log(list)
    return (
        <div className="imagens">
			{
                list.slice(0,8).map((item, index) => {
                    return <div key={item.id}>
                        <span><img
                            key={item.id}
                            src={item.image}
                            onClick={() => {
                                lightBoxHandler(true, index);
                            }}/>
                        </span>
                    </div>
                    })
            }
			<LightBox
				state={toggle}
                event={lightBoxHandler}
                data={ilist}
                thumbnailHeight={0}
                thumbnailWidth={0}
                setImageIndex={setSIndex}
                imageIndex={sIndex}
			/>
		</div>
    )
}

export default Images
