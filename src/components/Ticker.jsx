export default function Ticker() {
  const items = ['Tyres', 'Car Care', 'Car Wash', 'Oil Change', 'Detailing', 'Lounge'];
  const renderItems = () => items.map((item, i) => (
    <span key={i}>{item}<span></span></span>
  ));

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <span>{renderItems()}</span>
        <span>{renderItems()}</span>
      </div>
    </div>
  );
}
