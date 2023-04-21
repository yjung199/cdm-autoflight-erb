import React, { useState } from 'react';
import './App.css';
import CreateCard from './CreateCard';

interface ResponseData {
  title: string;
  body: string;
  status: number;
  action: string;
  detail: string;
}
function ConnectCdm() {
  const [cdmUrl, setCdmUrl] = React.useState('');
  const [response, setResponse] = React.useState<ResponseData | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  let stat: number;

  const handleSubmit = async (event: React.FormEvent, cdmUrl) => {
    event.preventDefault();
    cdmUrl = 'https://10.164.40.21/api-service/iam/v1/access-token';
    console.log('A url was submitted: ', cdmUrl);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userEmail: 'lgcdm@lge.com',
        userPw: 'tcmstest01',
      }),
    };

    fetch(cdmUrl, requestOptions)
      .then((response) => {
        stat = response.status;
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        const accessToken = responseData['accessToken'];
        // const stat = response.status;
        console.log('response: ', responseData);
        console.log('accToken: ', accessToken);
        console.log('stat: ', stat);
        // ipcRenderer.send()
        const prop = {
          title: 'Access Token',
          body: accessToken,
          status: stat,
          action: 'Refresh',
          detail: responseData,
        };
        setResponse(prop);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form
        className="my-8 space-y-6"
        onSubmit={(e) => handleSubmit(e, cdmUrl)}
      >
        <div className="items-center">
          <div className="rounded-md -space-y-px">
            <div>
              <label htmlFor="cdm-url" className="sr-only">
                CDM URL
              </label>
              <input
                id="cdm-url"
                name="cdmUrl"
                type="text"
                autoComplete="cdm-url"
                required
                className="w-full px-3 py-2 pr-20 rounded border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="CDM URL"
                onChange={(e) => setCdmUrl(e.target.value)}
              />

              <div className='flex justify-center mt-5'>
                {isLoading ? (
                  <button className="btn btn-sm btn-primary loading">connecting...</button>
                ) : (
                  <button
                    type="submit"
                    className={'btn btn-sm btn-primary'}
                    onClick={handleClick}
                    disabled={isLoading}
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div>
        {response && (
          <div>
            <CreateCard data={response} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectCdm;
