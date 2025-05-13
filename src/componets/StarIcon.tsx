
export function StarIcon(props: {color: string, width: string, height: string, style: React.CSSProperties | undefined}) {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 47 47" style={props.style} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2.92829 24.458C22.4548 23.5773 25.3077 13.6492 25.3077 -9.48201e-07C25.3077 22.4783 37.8998 24.276 46.4632 24.5142C29.6523 24.5088 25.3688 36.5646 25.2109 44.4614C25.2747 45.2761 25.3077 46.1219 25.3077 47C25.2292 46.2255 25.1927 45.371 25.2109 44.4614C23.9946 28.9374 11.583 24.7205 2.92829 24.458C1.99111 24.5003 1.01553 24.5217 2.74282e-06 24.5217C0.904731 24.452 1.88945 24.4265 2.92829 24.458Z"
                fill={props.color}/>
        </svg>
    )
}
