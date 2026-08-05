interface Props {
    title: string;
    subtitle: string;
  }
  
  export default function SectionTitle({
    title,
    subtitle,
  }: Props) {
    return (
      <div className="mx-auto mb-20 max-w-3xl text-center">
  
        <h2 className="text-5xl font-bold text-white">
          {title}
        </h2>
  
        <p className="mt-6 text-xl leading-9 text-slate-400">
          {subtitle}
        </p>
  
      </div>
    );
  }