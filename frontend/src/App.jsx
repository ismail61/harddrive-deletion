import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { themeSettings } from 'theme';
import Layout from 'scenes/layout';
import Dashboard from 'scenes/dashboard';
import Customers from 'scenes/customers';
import Orders from 'scenes/orders';
import Scans from 'scenes/scan';
import Check from 'scenes/check';
import AddCustomer from 'scenes/addCustomer';
import AddOrder from 'scenes/addOrder';
import CustomerView from 'scenes/CustomerView';
import Signin from 'scenes/SIgnIn';
import Signup from 'scenes/SignUp';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/orders" element ={<Orders/>} />
              <Route path="/scans" element ={<Scans/>} />
              <Route path="/check" element={<Check/>}/>
              <Route path='/addCustomer' element={<AddCustomer/>}/>
              <Route path='/addOrder' element={<AddOrder/>}/>
            </Route>
            <Route path="/customerView" element={<CustomerView/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signUp" element={<Signup/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
