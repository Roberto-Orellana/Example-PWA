import './App.css';
import React from 'react';
import { useEffect } from 'react';

function App() {

  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  return (

    <div className="container mt-5 contenedor">
      <header>
        <h1> PWA</h1>
        {isReadyForInstall && (
          <button onClick={downloadApp}> Descargasdasda </button>
        )}
      </header>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className='text-center'>Iniciar Sesión</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
              />
            </div>
            <div className='text-center p-4'>
              <button type="submit" className="btn btn-primary text-center">
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
