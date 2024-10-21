
export default function Adventure({Title, image}){
    return(
        <div className={` adventureContent ${image} `} >
            <h2>{Title} </h2>
        </div>
    )
}