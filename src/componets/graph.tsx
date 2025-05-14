import {useEffect, useRef, useState} from "react";
import ForceGraph2D, {ForceGraphMethods, LinkObject, NodeObject} from "react-force-graph-2d";
import {StarIcon} from "./StarIcon";

interface Node{
    id: number,
    depth: number,
    size: number
}

interface Link {
    source: number,
    target: number
}



function addChild(parentId: number,maxDepth: number, nowDepth:number, childrenNumber: number, g: {nodes: Node[], links: Link[]}) {
    if(childrenNumber > 10) return
    if(nowDepth === maxDepth) return;


    for(let i = 0; i < childrenNumber; i++) {
        const childId = parentId * 10 + i
        g.nodes.push({id: childId, depth: nowDepth, size: ((maxDepth - nowDepth) * 4 * (Math.random() * 0.7 + 0.3)) })
        g.links.push({target: childId, source: parentId})
        addChild(childId, maxDepth, nowDepth + 1, childrenNumber, g)
    }
}


export default function Graph() {
    const selfRef= useRef<ForceGraphMethods<NodeObject<Node>, LinkObject<Node, Link>>>(undefined);

    const [graphData, setGraphData] = useState<{nodes: Node[], links: Link[]}>({nodes: [], links: []})
    const [depth, setDepth] = useState(3);

    useEffect(() => {
        const gData: {nodes: Node[], links: Link[]} = {nodes: [], links: []}
        gData.nodes.push({id: 1, depth: 0, size: 20})
        addChild(1, depth, 1, 3, gData)

        if (selfRef.current) {
            selfRef.current.d3Force('link')?.distance((link:LinkObject<Node, Link>) => {
                console.log(link)
                const source = link.source as NodeObject<Node>

                return 2**(depth - source.depth) * 15 * (Math.random() * 0.5 + 0.5)
            });
        }

        setGraphData(gData)
    }, []);


    return(
        <div style={{width:"100%", display:"flex", justifyContent:"center"}} data-aos="fade-up">
            <ForceGraph2D
                width={1000}
                height={500}
                ref={selfRef}
                graphData={graphData}
                linkDirectionalParticles={1}
                linkDirectionalParticleSpeed={0.01}
                nodeVal={ obj =>  obj.size}
                enableZoomInteraction={false}
                enablePanInteraction={false}
                linkDirectionalArrowLength={3}
                nodeColor={obj => {
                    switch (obj.depth) {
                        case 0:
                            return "#FF8383"
                        case 1:
                            return "#FFEF7A"
                        case 2:
                            return "#9EFF86"
                        default:
                            return "#FF8383";
                    }
                }}
            />
        </div>
    )
}

