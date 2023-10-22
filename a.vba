Function GetPotentialCustomers(ByVal dataRange As Range, ByVal mdRow As Integer) As String
    Dim dict As Object
    Set dict = CreateObject("Scripting.Dictionary")
    
    Dim ws As Worksheet
    Set ws = dataRange.Worksheet

    Dim Rng As Range
    Set Rng = dataRange
    
    Dim cell As Range
    For Each cell In Rng.Cells(mdRow, 1).EntireRow
        If Not IsEmpty(cell) Then
            If MatchMedicare(cell.Value) Then
                Dim Key As String
                Dim Value As String
                
                Key = cell.Offset(0, -2).Value
                Value = ""
                
                Dim col As Range
                For Each col In cell.EntireRow.Cells
                    Value = Value & col.Value & " - "
                Next col
                
                If dict.Exists(Key) Then
                    dict(Key) = Left(Value, Len(Value) - 3)
                Else
                    dict.Add Key, Left(Value, Len(Value) - 3)
                End If
            End If
        End If
    Next cell

    Dim outputRange As Range
    Set outputRange = ws.Cells(1, Rng.columns(1).Column + Rng.columns.Count + 1)

    Dim dictKey As Variant
    Dim rowNum As Integer
    rowNum = 1
    For Each dictKey In dict.Keys
        outputRange.Offset(rowNum, 0).Value = dictKey
        outputRange.Offset(rowNum, 1).Value = dict(dictKey)
        rowNum = rowNum + 1
    Next dictKey

    ' Return the result as a string
    GetPotentialCustomers = "Your Result String Here"
End Function

Function MatchMedicare(fraction As String) As Boolean
    Dim numerator As Integer
    Dim denominator As Integer

    If fraction Like "md#/#" Then
        numerator = CInt(Mid(fraction, 3, InStr(fraction, "/") - 3))
        denominator = CInt(Mid(fraction, InStr(fraction, "/") + 1))

        MatchMedicare = (numerator = denominator - 1 Or numerator = denominator - 2)
    Else
        MatchMedicare = False
    End If
End Function
