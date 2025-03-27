import Story from './Story';

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
                <Story key={index} usuario={story.usuario} imagem={story.imagem} />
            ))}
        </div>
    )
}