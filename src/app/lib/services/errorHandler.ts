import { ToastrService } from 'ngx-toastr';


 

export class ErrorHandler {
    constructor (
        private toasterService:ToastrService,
    ){

    }
    handleError(error) {     
        if(typeof error == 'string') {

        } else {
            this.toasterService.error(error.error.message);
        }
    }
}