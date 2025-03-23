export default function Stories() {
    const stories = [
        { usuario: "meowed", imagem: "assets/meowed.svg" },
        { usuario: "barked", imagem: "assets/barked.svg" },
        { usuario: "respondeai", imagem: "assets/respondeai.svg" },
        { usuario: "barked", imagem: "assets/barked.svg" },
        { usuario: "respondeai", imagem: "assets/respondeai.svg" },
        { usuario: "barked", imagem: "assets/barked.svg" },
        { usuario: "respondeai", imagem: "assets/respondeai.svg" },
        { usuario: "barked", imagem: "assets/barked.svg" },
    ];

    return (
        <div className="stories">
            {stories.map((story, index) => (
                <div key={index} className="story">
                    <div className="imagem">
                        <img src={story.imagem} alt={story.usuario} />
                    </div>
                    <div className="usuario">{story.usuario}</div>
                </div>
            ))}
        </div>
    );
}