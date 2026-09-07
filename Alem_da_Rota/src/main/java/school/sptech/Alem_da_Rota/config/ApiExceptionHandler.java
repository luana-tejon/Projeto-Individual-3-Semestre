package school.sptech.Alem_da_Rota.config;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

    /**
     * Transforma os erros de validação do Spring em uma resposta simples,
     * que pode ser apresentada diretamente pelo Front-end.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> tratarValidacao(MethodArgumentNotValidException exception) {
        var mensagens = exception.getBindingResult().getFieldErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();

        return Map.of("mensagem", "Verifique os dados informados", "erros", mensagens);
    }
}
