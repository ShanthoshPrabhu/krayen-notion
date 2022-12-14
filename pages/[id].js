import { useEffect, useState } from "react";
import { getPage,getBlocks, getDatabase } from "../library/notion";

function pagedatas({
    page,
    pageblock,
    blockchild
}) {

    //Color for Paraagraph 

    // console.log("page",page)
    // console.log("pageblock",pageblock)

console.log('blockchild',blockchild)
    const datasOfPage = pageblock
    const items = datasOfPage || []
    const codeBlocks = 
                items.map((block) => {
                // console.log("bloc",block?.heading_3?.rich_text[0]?.text?.content)
                  if(block.type == "callout") {
                    return (
                        <div key={block?.id} className="px-4 py-2 text-black bg-yellow-200 rounded-xl" >
                            <div> <span key={block?.id} className="inline-block mr-2">{block?.callout?.icon?.type =="emoji" ? block?.callout?.icon?.emoji : "" }</span> 
                             {block?.callout?.rich_text[0]?.text?.content}</div>
                        </div>
                    )
                } else if( block.type == "code"){
                return (
                    <pre  className={`p-4 overflow-x-auto text-white bg-gray-800 rounded-md`}  key={block.id}>{block?.code?.rich_text[0]?.text?.content}</pre>
                )

    //Headings
                } else if(block.type == "heading_3") {
                    return (
                        <div key={block?.id} className="text-xl font-bold text-gray-800 capitalize" >
                             {block?.heading_3?.rich_text[0]?.text?.content}
                        </div>
                    )
                }else if(block.type == "heading_2") {
                    return (
                        <div key={block?.id} className="text-2xl font-bold text-gray-800 capitalize " >
                             {block?.heading_2?.rich_text[0]?.text?.content}
                        </div>
                    )
                } else if(block.type == "heading_1") {
                    return (
                        <div key={block?.id} className="text-3xl font-bold leading-tight capitalize" >
                             {block?.heading_1?.rich_text[0]?.text?.content}
                        </div>
                    )
                }

    //Paragraph
               else if(block.type == "paragraph") {
                    const [colorPara, setColorPara] = useState(block?.paragraph?.color == "default" ? "gray" : "black")
                    useEffect(()=>{
                        setColorPara(block?.paragraph?.color)
                        },[block])
                    
                    return (
                        <div key={block?.id} className={`max-w-full w-full text-lg white-space-pre-wrap word-break-break-word caret-color-${colorPara}-500 p-3`}>
                             {block?.paragraph?.rich_text[0]?.text?.content}
                        </div>
                    )
                }
                else if(block.type == "quote") {
                    const [colorQuote, setColorQuote] = useState(block?.quote?.color == "default" ? "gray" : "black")
                    useEffect(()=>{
                        setColorQuote(block?.quote?.color)
                        },[block])
                    return (
                        <div key={block?.id} className= {`w-full caret-color-${colorQuote}-500 p-3 max-w-full text-lg border-gray-800 white-space-pre-wrap word-break-break-word text-md border-x-4`}>
                             {block?.quote?.rich_text[0]?.text?.content}
                        </div>
                    )
                }  else if(block.type == "toggle") {
                        const [colorToggle, setColorToggle] = useState(block?.toggle?.color == "default" ? "gray" : "black");
                        const [open, setOpen] = useState(false);

                        const handleToggle = () => {
                        setOpen(!open);
                        };

                        return (
                        <div key={block?.id} className={`text-${colorToggle}-400 font-medium leading-relaxed mb-4 relative`}>
                            <button className="focus:outline-none toggle-button" onClick={handleToggle}>
                            <div className="flex items-center">
                                <svg className="w-6 h-6" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5L5 9L9 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="ml-2 text-lg font-medium leading-5 text-gray-900"> {block?.toggle?.rich_text[0]?.text?.content}</span>
                            </div>
                            </button>
                            {block.has_children && (
                            <div className={`toggle-content ${open ? 'block' : 'hidden'}`}>
                                {blockchild.map((child) => {
                                if (child.type == "paragraph") {
                                    return <p className="text-black">{child?.paragraph?.rich_text[0]?.text?.content}</p>;
                                } 
                                })}
                            </div>
                            )}
                        </div>
                        );

                } else if(block.type == "to_do") {
                    const [colorToDo, setColorToDo] = useState(block?.to_do?.color == "default" ? "gray" : "black")
                    useEffect(()=>{
                        setColorToDo(block?.to_do?.color)
                        },[block])
                    const classNameCheck = block?.to_do?.checked == true ? "line-through" : '';
                        // console.log("todo",classNameCheck)
                    return (
                        <div key={block?.id} className= {`text-${colorToDo}-400 font-medium  ${classNameCheck} leading-relaxed mb-4`}>
                             <input type="checkbox" checked={block?.to_do?.checked} />
                             {block?.to_do?.rich_text[0]?.text?.content}
                             
                        </div>
                       
                    )
                } else if (block.type === "numbered_list_item") {
                    return (
                        <li className="list-decimal text-md">
                            {block.numbered_list_item.rich_text[0].text.content}
                        </li>
                    )
                }

            })

  return (
   <div>
   {codeBlocks}
    </div>
  )
}

export default pagedatas


export const databaseId = 'e649f6c751994c0ea85ac6cd6495e7f4'; 
export const pageId='eb889e735554462ca107e68cd7ace229';


export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId)
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true
  }
}



export const blockid = 'a2f8852f-0bee-4c1e-9ba2-fcdd7c52eab6'



export const getStaticProps = async () => {
   const pageblock = await getBlocks(pageId);
   const pagedata = await getPage(pageId);
   const child = await getBlocks(blockid);
//    console.log('dataaaaaa', pageblock);
//    console.log("0hjh",pagedata);
  return {
    props: {
      page:pagedata,
      pageblock:pageblock,
      blockchild:child
    },
    revalidate: 1,
  };
};

//  export const blockd = 'a2f8852f-0bee-4c1e-9ba2-fcdd7c52eab6'


// export const getStaticProps = async ({ params }) => {
//    const pageblock = await getBlocks(pageId);
//    const pagedata = await getPage(pageId);
//    const childPromises = blockId.filter(id => id).map(id => getBlocks(id));
//    const child = await Promise.all(childPromises);
//   // const child = await getBlocks(blockId);
// //    console.log('dataaaaaa', pageblock);
// //    console.log("0hjh",pagedata);
//   return {
//     props: {
//       page:pagedata,
//       pageblock:pageblock,
//       blockchild:child
//     },
//     revalidate: 1,
//   };
// };

//export const databaseId = '4c699e3e758d41248751780fefed7d23';
//export const pageId='4606f5e400c34d68b8a0353328ad0c3c'