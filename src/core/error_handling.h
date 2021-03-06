#ifndef ERROR_HANDLING_H
#define ERROR_HANDLING_H
// clang-format off
#define PY_SSIZE_T_CLEAN
#include "Python.h"
// clang-format on
#include <emscripten.h>

typedef int errcode;

int
error_handling_init();

errcode
log_error(char* msg);

/** EM_JS Wrappers
 * Wrap EM_JS so that it produces functions that follow the Python return
 * conventions. We catch javascript errors and proxy them and use
 * `PyErr_SetObject` to hand them off to python. We need two variants, one
 * for functions that return pointers / references (return 0)
 * the other for functions that return numbers (return -1).
 *
 * WARNING: These wrappers around EM_JS cause macros in body to be expanded,
 * where this would be prevented by the ordinary EM_JS macro.
 * This causes trouble with true and false.
 * In types.h we provide nonstandard definitions:
 * false ==> (!!0)
 * true ==> (!!1)
 * These work as expected in both C and javascript.
 *
 * Note: this change in expansion behavior is unavoidable unless we copy the
 * definition of macro EM_JS into our code due to limitations of the C macro
 * engine. It is useful to be able to use macros in the EM_JS, but it might lead
 * to some unpleasant surprises down the road...
 */

// clang-format off
#define EM_JS_REF(ret, func_name, args, body...)                               \
  EM_JS(ret, func_name, args, {                                                \
    "use strict";                                                              \
    try    /* intentionally no braces, body already has them */                \
      body /* <== body of func */                                              \
    catch (e) {                                                                \
        /* Dummied out until calling code is ready to catch these errors */    \
        throw e;                                                               \
        Module.handle_js_error(e);                                             \
        return 0;                                                              \
    }                                                                          \
    throw new Error("Assertion error: control reached end of function without return");\
  })

#define EM_JS_NUM(ret, func_name, args, body...)                               \
  EM_JS(ret, func_name, args, {                                                \
    "use strict";                                                              \
    try    /* intentionally no braces, body already has them */                \
      body /* <== body of func */                                              \
    catch (e) {                                                                \
        /* Dummied out until calling code is ready to catch these errors */    \
        throw e;                                                               \
        Module.handle_js_error(e);                                             \
        return -1;                                                             \
    }                                                                          \
    return 0;  /* some of these were void */                                   \
  })
// clang-format on

/** Failure Macros
 * These macros are intended to help make error handling as uniform and
 * unobtrusive as possible. The EM_JS wrappers above make it so that the
 * EM_JS calls behave just like Python API calls when it comes to errors
 * So these can be used equally well for both cases.
 *
 * These all use "goto finally;" so any function that uses them must have
 * a finally label. Luckily, the compiler errors triggered byforgetting
 * this are usually quite clear.
 *
 * We define a feature flag "DEBUG_F" that will use "console.error" to
 * report a message whenever these functions exit with error. This should
 * particularly help to track down problems when C code fails to handle
 * the error generated.
 *
 * FAIL() -- unconditionally goto finally; (but also log it with
 *           console.error if DEBUG_F is enabled)
 * FAIL_IF_NULL(ref) -- FAIL() if ref == NULL
 * FAIL_IF_MINUS_ONE(num) -- FAIL() if num == -1
 * FAIL_IF_ERR_OCCURRED(num) -- FAIL() if PyErr_Occurred()
 */

#ifdef DEBUG_F
#define FAIL()                                                                 \
  do {                                                                         \
    char* msg;                                                                 \
    asprintf(&msg,                                                             \
             "Raised exception on line %d in func %s, file %s\n",              \
             __LINE__,                                                         \
             __func__,                                                         \
             __FILE__);                                                        \
    log_error(msg);                                                            \
    free(msg);                                                                 \
    goto finally                                                               \
  } while (0)

#else
#define FAIL() goto finally
#endif

#define FAIL_IF_NULL(ref)                                                      \
  do {                                                                         \
    if (ref == NULL) {                                                         \
      FAIL();                                                                  \
    }                                                                          \
  } while (0)

#define FAIL_IF_MINUS_ONE(num)                                                 \
  do {                                                                         \
    if (num != 0) {                                                            \
      FAIL();                                                                  \
    }                                                                          \
  } while (0)

#define FAIL_IF_ERR_OCCURRED()                                                 \
  do {                                                                         \
    if (PyErr_Occurred()) {                                                    \
      FAIL();                                                                  \
    }                                                                          \
  } while (0)

#endif // ERROR_HANDLING_H
