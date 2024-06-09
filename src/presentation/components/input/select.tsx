import { InputFieldProps } from ".";

interface SelectInputFieldProps extends InputFieldProps {
  options: string[];
  value: string;
}

export function SelectInputFieldBuilder({
  props,
}: {
  props: SelectInputFieldProps;
}) {
  return (
    <div>
      <label>{props.label}</label>
      <select
        className="select"
        value={props.value?.length == 0 ? undefined : props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
