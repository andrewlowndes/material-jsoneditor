import React, { useState } from 'react';
import { render } from 'react-dom';
import { Grid } from '@mui/material';
import { JSONType, Editor, JSONTextEditor } from '../index';

const exampleJson = {};

function Demo() {
  const [data, setData] = useState<JSONType>(exampleJson);

  return (
    <Grid container>
      <Grid display="flex" item xs={12} sm={6} sx={{ padding: 1 }}>
        <Editor value={data} onChange={setData} />
      </Grid>

      <Grid display="flex" item xs={12} sm={6} sx={{ padding: 1 }}>
        <JSONTextEditor value={data} onChange={setData} />
      </Grid>
    </Grid>
  );
}

render(<Demo />, document.getElementById('app'));
