import React, { useState } from 'react';
import { render } from 'react-dom';
import { Grid } from '@material-ui/core';
import { JSONType, Editor, JSONTextEditor } from '../index';

const exampleJson = {};

const Demo = () => {
    const [data, setData] = useState<JSONType>(exampleJson);

    return (
      <Grid container>
        <Grid display="flex" item xs={12} sm={6} sx={{ padding: 1 }}>
          <Editor value={data} onChange={(val) => setData(val)}></Editor>
        </Grid>

        <Grid display="flex" item xs={12} sm={6} sx={{ padding: 1 }}>
          <JSONTextEditor value={data} onChange={(val) => setData(val)}></JSONTextEditor>
        </Grid>
      </Grid>
    );
}

render((<Demo></Demo>), document.getElementById('app'));
