import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogContent';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function DialogDelete({title,desc,closeDialog,confirm,deleteData}){

    return(
        <Dialog
        open={confirm}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button 
          className="bg-red-600 py-1 px-2 text-gray-100 rounded-md mr-2"
          onClick={closeDialog} color="primary">
            Disagree
          </button>
          <button 
          className="bg-gray-400 py-1 px-2 rounded-md"
          onClick={deleteData} color="primary" autoFocus>
            Agree
          </button>
        </DialogActions>
      </Dialog>
    )
}