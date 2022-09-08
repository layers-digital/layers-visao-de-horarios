import Toast from '@/helpers/toast';

export default async function downloadFile(url) {
  Toast.open({
    message: 'Estamos fazendo download do arquivo...',
    position: 'bottom',
    type: 'success',
    timeout: 4000,
    options: { loading: true },
  });

  try {
    await window.LayersPortal('download', {
      url: url,
      name: 'file-' + Date.now() + '.pdf',
      // name: name,
    });
  } catch (error) {
    Toast.hideAll();
    Toast.open({
      message: 'Ops! Algo deu errado no seu download, tente novamente.',
      type: 'danger',
      position: 'bottom',
      timeout: 10000,
    });
  }
}
