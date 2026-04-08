interface TrustNoteProps {
  date?: string;
}

export default function TrustNote({ date }: TrustNoteProps) {
  return (
    <p className="text-xs text-muted">
      Dati da Scuola in Chiaro / MIM.
      {date && (
        <>
          {" "}
          Ultimo aggiornamento:{" "}
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("it-IT", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          .
        </>
      )}
    </p>
  );
}
