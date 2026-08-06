datalogger.onLogFull(function () {
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.A, function () {
    datalogger.deleteLog()
    basic.showIcon(IconNames.Yes)
})
let time1 = 0
let delta_t = 0
let time2 = 0
let PulseDet = 0
let pulse_out = 0
basic.showString("PULS__")
let counter = 0
basic.forever(function () {
    basic.showNumber(pulse_out)
    basic.showIcon(IconNames.Heart)
})
basic.forever(function () {
    PulseDet = pins.analogReadPin(AnalogReadWritePin.P2)
})
basic.forever(function () {
    serial.writeValue("Pulse diagram", PulseDet)
})
basic.forever(function () {
    if (PulseDet > 870 && counter == 0) {
        time2 = input.runningTime()
        delta_t = time2 - time1
        time1 = time2
        counter = 1
        pulse_out = (60000 - 60000 % delta_t) / delta_t
    } else if (PulseDet <= 430 && counter == 1) {
        counter = 0
    }
})
