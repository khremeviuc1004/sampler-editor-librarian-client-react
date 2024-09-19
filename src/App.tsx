import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Sampler } from './features/sampler/sampler.component';
import { ConfigProvider, theme } from 'antd';
import { InMemoryProgram } from './features/sampler/in-memory-program.component';
import { InMemoryKeygroup } from './features/sampler/in-memory-key-group.component';
import { InMemorySample } from './features/sampler/in-memory-sample.component';
import { Config } from './features/config/config.component';
import { StatusReport } from './features/sampler/status-report.component';

interface AppProps {}

const App: React.FunctionComponent<AppProps> = (props) => {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route index element={<Config />} />
            <Route path="/config" element={<Config />} />
            <Route path="/sampler" element={<Sampler />} />
            <Route path="/in-memory-program/:id" element={<InMemoryProgram />} />
            <Route path="/in-memory-key-group/:programNumber/keygroup/:keygroupNumber" element={<InMemoryKeygroup />} />
            <Route path="/in-memory-sample/:sampleNumber" element={<InMemorySample />} />
            <Route path="/status-report" element={<StatusReport />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
