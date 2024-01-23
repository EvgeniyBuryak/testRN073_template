import React from "react";

import RootStack from '~/navigation';

interface Props {}

const App: React.FC<Props> = (props: Props) => {
  return (
    <>
      <RootStack />
    </>
  );
}

export default App;
