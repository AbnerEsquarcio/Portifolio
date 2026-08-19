import '../styles/Timeline.css';

export default function Timeline({ title, items }) {
  return (
    <div className="timeline-section">
      <h2>{title}<span className="dot">.</span></h2>
      <div className="timeline-box">
        <div className="timeline-line" />
        {items.map((item) => (
          <div className="timeline-entry" key={item.id}>
            <div className="timeline-marker" />
            <div className="timeline-item">
              <div className="timeline-header">
                <h3 className="timeline-title">{item.title}</h3>
                <span className="timeline-date">{item.date}</span>
              </div>
              <h4 className="timeline-subtitle">{item.subtitle}</h4>
              <p className="timeline-text">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
