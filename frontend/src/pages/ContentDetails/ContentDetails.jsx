import { useLocation, useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import Nav from "../../components/Nav/Nav";
import mediumZoom from 'medium-zoom';

const ContentDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const imageRef = useRef(null);

    const handleBack = () => {
        navigate(-1);
    };

    const content = location.state?.content;

    const isNotVideo = content?.content_type !== 0;

    useEffect(() => {
        if (isNotVideo && imageRef.current) {
            const zoom = mediumZoom(imageRef.current, {
                background: 'rgba(0, 0, 0, 0.8)', 
                margin: 24
            });

            return () => zoom.detach(); 
        }
    }, [isNotVideo]);

    if (!content) {
        return <p>Contenido no disponible actualmente, disculpe las molestias</p>;
    }

    const urlElement = isNotVideo ? (
        <img
            ref={imageRef}
            src={content.thumbnail_url}
            alt={content.alt}
            className="zoomable w-4/10 max-h-screen object-contain rounded-lg place-self-center cursor-zoom-in"
        />
    ) : (
        <iframe 
            className="w-5/10 h-2/3 rounded-lg place-self-center"
            src={content.url}
            allowFullScreen
        />
    );

    return (
        <>
            <div className="h-screen flex flex-row max-w-full overflow-hidden p-4 gap-4">
                {urlElement}
                <div className="flex-1 flex flex-col overflow-hidden text-right text-[#343434]">
                    <button
                        className="text-3xl self-end justify-self-start mb-10 rounded-full px-5 py-3 border-2 border-[#343434] hover:text-white hover:bg-[#343434]"
                        onClick={handleBack}
                    >
                        &lt;
                    </button>
                    <h1 className="text-6xl font-bold mb-9">{content.title}</h1>
                    <h2 className="text-xl">{content.description}</h2>
                </div>
            </div>
            <Nav />
        </>
    );
};

export default ContentDetails;
