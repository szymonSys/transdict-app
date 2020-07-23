import useSwitch from "../hooks/useSwitch";

export default function WithSwitch({ children, primary, secondary, ...rest }) {
  const [switchables, reverse, setSwitchables] = useSwitch([
    primary,
    secondary,
  ]);
  return children({ switchables, reverse, setSwitchables, ...rest });
}
