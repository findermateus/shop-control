interface ManagerPageTitleProps {
    readonly title: string;
    readonly description?: string;
}

export default function ManagerPageTitle(props: ManagerPageTitleProps) {
    const { title, description } = props;
    return (
        <div className="mb-8 space-y-1">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}
