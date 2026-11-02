import {useState} from 'react';
import {Form} from 'react-router';
import {
  VEHICLE_MAKES,
  VEHICLE_YEARS,
  type VehicleSelection,
} from '~/data/vehicles';
import {Icon} from './Icon';

export function VehicleSelector({
  initial,
  compact = false,
}: {
  initial?: VehicleSelection;
  compact?: boolean;
}) {
  const [makeId, setMakeId] = useState(initial?.make ?? '');
  const make = VEHICLE_MAKES.find((item) => item.id === makeId);
  return (
    <div className={`vehicle-selector ${compact ? 'compact' : ''}`}>
      <div className="vehicle-intro">
        <span className="vehicle-icon">
          <Icon name="car" size={28} />
        </span>
        <div>
          <p className="eyebrow">A BETTER FIT STARTS HERE</p>
          <h2>Shop by vehicle</h2>
        </div>
      </div>
      <Form method="get" action="/vehicle" className="vehicle-form">
        <label>
          <span>
            01 <b>Make</b>
          </span>
          <select
            name="make"
            required
            value={makeId}
            onChange={(event) => setMakeId(event.target.value)}
          >
            <option value="" disabled>
              Select make
            </option>
            {VEHICLE_MAKES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>
            02 <b>Model</b>
          </span>
          <select
            key={makeId}
            name="model"
            required
            disabled={!make}
            defaultValue={initial?.make === makeId ? initial.model : ''}
          >
            <option value="" disabled>
              Select model
            </option>
            {make?.models.map((model) => (
              <option key={model}>{model}</option>
            ))}
          </select>
        </label>
        <label>
          <span>
            03 <b>Year</b>
          </span>
          <select
            name="year"
            required
            disabled={!make}
            defaultValue={initial?.year ?? ''}
          >
            <option value="" disabled>
              Select year
            </option>
            {VEHICLE_YEARS.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </label>
        <button className="button button-primary" type="submit">
          Explore my options <Icon name="arrow" />
        </button>
      </Form>
      <p className="vehicle-disclosure">
        Selector preview. Vehicle options are illustrative; product
        compatibility requires verification.
      </p>
    </div>
  );
}
