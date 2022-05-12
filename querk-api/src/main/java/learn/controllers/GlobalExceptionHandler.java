//package learn.controllers;
//
//import org.springframework.dao.DataAccessException;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.http.converter.HttpMessageNotReadableException;
//import org.springframework.web.HttpMediaTypeNotSupportedException;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//
//@ControllerAdvice
//public class GlobalExceptionHandler {
//
//
//    @ExceptionHandler(HttpMessageNotReadableException.class)
//    public ResponseEntity<String> messageNotReadable(HttpMessageNotReadableException ex){
//        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
//    }
//
//    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
//    public ResponseEntity<String> unsupportedMediaType(HttpMediaTypeNotSupportedException ex) {
//        return  new ResponseEntity<>(ex.getMessage(), HttpStatus.UNSUPPORTED_MEDIA_TYPE);
//    }
//
//
//
//    @ExceptionHandler(DataAccessException.class)
//    public ResponseEntity<String> handleDataException(DataAccessException ex) {
//        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
//    }
//
//    @ExceptionHandler(IllegalArgumentException.class)
//    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex){
//        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
//    }
//
//
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> lastResortHandleException(Exception toHandle){
//        // all we know is SOME exception leaked out past all our other more specific checks
//        return new ResponseEntity<>("Something unexpectedly went wrong.Sorry :(",
//                HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//
//
//}
